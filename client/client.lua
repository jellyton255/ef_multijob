local config = require('config')
local JOBS = exports.qbx_core:GetJobs()

local PanelOpen = false
local Loaded = false

---@class MultiJobGradeData
---@field name string
---@field level number

---@class MultiJobData
---@field name string
---@field label string
---@field payment number
---@field isboss boolean
---@field onduty boolean
---@field grade MultiJobGradeData
---@field workType 'salary' | 'contract'

---Get job data to be transmitted to the UI
---@param job string
---@param grade number
---@return MultiJobData?
local function getJobData(job, grade)
	local jobEntryData = JOBS[job] ---@type Job

	if not jobEntryData then
		lib.print.error('Job not found, removing: ' .. job)
		TriggerServerEvent('EF-MultiJob:Server:RemoveJob', job)
		return
	end

	if not jobEntryData.grades[grade] then
		grade = #jobEntryData.grades
		lib.print.error('Job not found, removing: ' .. job)
		return
	end

	return {
		name = job,
		label = jobEntryData.label,
		payment = jobEntryData.grades[grade].payment,
		isboss = jobEntryData.grades[grade].isboss or false,
		onduty = QBX.PlayerData.job.onduty or jobEntryData.defaultDuty or false,
		grade = {
			name = jobEntryData.grades[grade].name,
			level = grade
		},
		workType = config.salaryJobs[job] and 'salary' or 'contract'
	}
end

local function getFormattedJobs(jobs)
	local formattedJobs = {}

	for job, grade in pairs(jobs or QBX.PlayerData.jobs) do
		local jobData = getJobData(job, grade)

		if jobData then
			formattedJobs[#formattedJobs + 1] = jobData
		end
	end

	return formattedJobs
end

function Initialize()
	SendReactMessage('setJobs', getFormattedJobs())
	SendReactMessage('setCurrentJob', getJobData(QBX.PlayerData.job.name, QBX.PlayerData.job.grade.level))
end

RegisterNetEvent('QBCore:Player:SetPlayerData', function(value)
	SendReactMessage('setJobs', getFormattedJobs(value.jobs))

	local jobData = getJobData(value.job.name, value.job.grade.level)
	jobData.onduty = value.job.onduty

	SendReactMessage('setCurrentJob', jobData)
end)

-- NUI Handlers
local function toggleNuiFrame(shouldShow)
	if not Loaded then
		lib.print.error('NUI not loaded yet...')
		return
	end

	if shouldShow then
		PanelOpen = true
	else
		PanelOpen = false
	end

	SendReactMessage('setVisible', shouldShow)
	SetNuiFocus(shouldShow, shouldShow)
end

-- Callbacks
RegisterNUICallback('selectJob', function(job, cb)
	lib.print.debug('Selecting Job: ' .. job)

	TriggerServerEvent('EF-MultiJob:Server:SelectJob', job)
	cb(1)
end)

RegisterNUICallback('removeJob', function(job, cb)
	lib.print.debug('Removing Job: ' .. job)

	TriggerServerEvent('EF-MultiJob:Server:RemoveJob', job)
	cb(1)
end)

RegisterNUICallback('setJobDuty', function(status, cb)
	lib.print.debug('Setting Job Duty Status: ' .. tostring(status))

	TriggerServerEvent('EF-MultiJob:Server:SetDutyStatus', status)
	cb(1)
end)

AddEventHandler('QBCore:Client:OnPlayerLoaded', function()
	Initialize()
end)

RegisterNUICallback('Loaded', function(data, cb)
	Loaded = true
	cb(1)
	if not LocalPlayer.state.isLoggedIn then return end
	Initialize()
end)

RegisterNUICallback('hideFrame', function(_, cb)
	cb(1)
	toggleNuiFrame(false)
	PanelOpen = false

	lib.print.debug('Hide NUI frame')
end)

RegisterCommand('toggleJobMenu', function()
	toggleNuiFrame(not PanelOpen)
end)
RegisterKeyMapping('toggleJobMenu', 'Job Menu', 'keyboard', 'F9')
