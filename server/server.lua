RegisterNetEvent("EF-MultiJob:Server:SelectJob", function(job)
	local src = source
	local player = exports.qbx_core:GetPlayer(src)

	if not job then
		lib.print.error(GetPlayerName(src) .. " (" .. src .. ") select a job without specifying a job to select.")
		return
	end

	if job == "unemployed" then
		exports.qbx_core:SetPlayerPrimaryJob(player.PlayerData.citizenid, job)
		return
	end

	local jobs = player.PlayerData.jobs

	if not jobs[job] then
		lib.print.error(player.PlayerData.name .. " tried to select a job they don't have.")
		return
	end

	lib.print.debug(player.PlayerData.name .. " selected job: " .. job)

	exports.qbx_core:SetPlayerPrimaryJob(player.PlayerData.citizenid, job)
end)

RegisterNetEvent("EF-MultiJob:Server:RemoveJob", function(job)
	local src = source

	if not job then
		lib.print.error(GetPlayerName(src) .. " (" .. src .. ") tried to remove a job without specifying a job to remove.")
		return
	end

	local player = exports.qbx_core:GetPlayer(src)

	lib.print.debug(player.PlayerData.name .. " removed job: " .. job)

	exports.qbx_core:RemovePlayerFromJob(player.PlayerData.citizenid, job)
end)

RegisterNetEvent("EF-MultiJob:Server:SetDutyStatus", function(status)
	local src = source

	if status == nil then
		lib.print.error(GetPlayerName(src) .. " (" .. src .. ") tried to set duty status to nil.")
		return
	end

	local player = exports.qbx_core:GetPlayer(src)

	lib.print.debug("Set duty status: " .. tostring(status))

	player.Functions.SetJobDuty(status)
end)
