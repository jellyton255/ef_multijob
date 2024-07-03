local config = require("config")
local JOBS = exports.qbx_core:GetJobs()

local PanelOpen = false
local Loaded = false

local function getJobsData(jobs)
	local formattedJobs = {}

	for job, grade in pairs(jobs or QBX.PlayerData.jobs) do
		if not JOBS[job] then
			lib.print.error("Job not found, removing: " .. job)
			TriggerServerEvent("EF-MultiJob:Server:RemoveJob", job)

			goto continue
		end

		formattedJobs[#formattedJobs + 1] = {
			name = job,
			label = JOBS[job].label,
			payment = JOBS[job].grades[grade].payment,
			isboss = JOBS[job].grades[grade].isboss or false,
			grade = {
				name = JOBS[job].grades[grade].name,
				level = grade
			},
			workType = config.salaryJobs[job] and "salary" or "contract"
		}

		:: continue ::
	end

	return formattedJobs
end

function Initialize()
	SendReactMessage("setJobs", getJobsData())

	local jobData = QBX.PlayerData.job
	jobData.workType = config.salaryJobs[jobData.name] and "salary" or "contract"

	SendReactMessage("setCurrentJob", jobData)
end

RegisterNetEvent('QBCore:Client:OnJobUpdate', function(job, oldJobs)
	lib.waitFor(function()
		lib.print.debug(QBX.PlayerData.job.name, job.name)
		if QBX.PlayerData.job.name == job.name then return true end
	end, nil, 5000)

	local jobData = QBX.PlayerData.job
	jobData.workType = config.salaryJobs[jobData.name] and "salary" or "contract"

	SendReactMessage("setCurrentJob", jobData)
end)

RegisterNetEvent('qbx_core:client:onGroupUpdate', function(jobName, grade, oldJobs)
	lib.waitFor(function()
		lib.print.debug(QBX.PlayerData.job.name, jobName)
		if QBX.PlayerData.job.name == jobName then return true end
	end, nil, 5000)

	local jobData = QBX.PlayerData.job
	jobData.workType = config.salaryJobs[jobData.name] and "salary" or "contract"

	SendReactMessage("setCurrentJob", jobData)
end)

RegisterNetEvent('QBCore:Player:SetPlayerData', function(value)
	SendReactMessage("setJobs", getJobsData(value.jobs))
end)

RegisterNetEvent('QBCore:Client:SetDuty', function(duty)
	lib.waitFor(function()
		lib.print.debug(QBX.PlayerData.job.onduty, duty)
		if QBX.PlayerData.job.onduty == duty then return true end
	end, nil, 5000)

	local jobData = QBX.PlayerData.job
	jobData.workType = config.salaryJobs[jobData.name] and "salary" or "contract"

	SendReactMessage("setCurrentJob", jobData)
end)


-- NUI Handlers
local function toggleNuiFrame(shouldShow)
	if not Loaded then
		lib.print.error("NUI not loaded yet...")
		return
	end

	if shouldShow then
		PanelOpen = true
	else
		PanelOpen = false
	end

	SendReactMessage("setVisible", shouldShow)
	SetNuiFocus(shouldShow, shouldShow)
end

-- Callbacks
RegisterNUICallback("selectJob", function(job, cb)
	lib.print.debug("Selecting Job: " .. job)

	TriggerServerEvent("EF-MultiJob:Server:SelectJob", job)
	cb(1)
end)

RegisterNUICallback('removeJob', function(job, cb)
	lib.print.debug("Removing Job: " .. job)

	TriggerServerEvent("EF-MultiJob:Server:RemoveJob", job)
	cb(1)
end)

RegisterNUICallback('setJobDuty', function(status, cb)
	lib.print.debug("Setting Job Duty Status: " .. tostring(status))

	TriggerServerEvent("EF-MultiJob:Server:SetDutyStatus", status)
	cb(1)
end)

AddEventHandler('QBCore:Client:OnPlayerLoaded', function()
	Initialize()
end)

RegisterNUICallback("Loaded", function(data, cb)
	Loaded = true
	cb(1)
	if not LocalPlayer.state.isLoggedIn then return end
	Initialize()
end)

RegisterNUICallback("hideFrame", function(_, cb)
	cb(1)
	toggleNuiFrame(false)
	PanelOpen = false

	lib.print.debug("Hide NUI frame")
end)

local keybindMenuMultiJob = lib.addKeybind({
    name = 'toggleJobMenu',
    description = 'Job Menu',
    defaultKey = 'F9',
    onPressed = function(self)
        toggleNuiFrame(not PanelOpen)
        lib.print.info(('pressed %s (%s)'):format(self.currentKey, self.name))
    end
})
