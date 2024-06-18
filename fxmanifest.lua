fx_version 'cerulean'
game 'gta5'

description "Everfall Multijob"
author "Jellyton"
version '1.0.0'
description 'Everfall multijob selector. Made with React.'
license 'GPL-3.0'
repository 'https://github.com/jellyton255/ef-multijob'

lua54 'yes'

ui_page 'web/build/index.html'

shared_scripts {
	'@ox_lib/init.lua',
}

client_scripts {
	'@qbx_core/modules/playerdata.lua',
	"client/**/*.lua"
}

server_script "server/**/*.lua"

files {
	"config.lua",
	'web/build/index.html',
	'web/build/**/*',
}
