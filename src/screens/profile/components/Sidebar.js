import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

const selected = "w-full font-thin uppercase text-blue-500 flex items-center p-4 my-2 transition-colors duration-200 justify-start bg-gradient-to-r from-white to-blue-100 border-r-4 border-blue-500 dark:from-gray-700 dark:to-gray-800 border-r-4 border-blue-500";
const not_selected = "w-full font-thin uppercase text-gray-500 dark:text-gray-200 flex items-center p-4 my-2 transition-colors duration-200 justify-start hover:text-blue-500"

const Sidebar = ({terminal}) => {
    return (
        <div class="h-screen hidden lg:block my-4 ml-4 shadow-lg relative w-80">
        <div class="bg-white h-full rounded-2xl dark:bg-gray-700">
            <div class="flex items-center justify-center pt-6 text-xl">
                Notes
            </div>
            <nav class="mt-6">
                <div>
                    <a class={terminal == 'notes' ? selected : not_selected} href="#">
                        <span class="text-left">
                            <FormatListBulletedIcon/>
                        </span>
                        <span class="mx-4 text-sm font-normal">
                            Notas
                        </span>
                    </a>
                </div>
            </nav>
        </div>
    </div>
    )
}

export default Sidebar;