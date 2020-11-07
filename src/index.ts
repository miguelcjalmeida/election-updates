import globals from './app/globals'
import { AppUpdater } from './app/updater'

const appUpdater = new AppUpdater()
appUpdater.start()
Object.assign(window, globals)
