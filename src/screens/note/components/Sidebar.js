import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import GroupIcon from '@mui/icons-material/Group';

import LogoutIcon from '@mui/icons-material/Logout';

const selected = "w-full font-thin uppercase text-blue-500 flex items-center p-4 my-2 transition-colors duration-200 justify-start bg-gradient-to-r from-white to-blue-100 border-r-4 border-blue-500 dark:from-gray-700 dark:to-gray-800 border-r-4 border-blue-500";
const not_selected = "w-full font-thin uppercase text-gray-500 dark:text-gray-200 flex items-center p-4 my-2 transition-colors duration-200 justify-start hover:text-blue-500"

const Sidebar = ({api, note_id, note_title, terminal, setTerminal, permission}) => {
    return (
        <div className="h-screen hidden lg:block my-4 ml-4 shadow-lg relative w-80">
        <div className="bg-white h-full rounded-2xl dark:bg-gray-700">
            <div className="flex items-center justify-center pt-6 text-xl">
                {note_title}
            </div>
            <nav className="mt-6">
                <div>
                    <a className={not_selected} href="/notes">
                        <span className="text-left">
                            <FormatListBulletedIcon/>
                        </span>
                        <span className="mx-4 text-sm font-normal">
                            Notas
                        </span>
                    </a>
                </div>
                <hr/>
                <div>
                    <button onClick={() => setTerminal('content')} className={terminal == 'content' ? selected : not_selected}>
                        <span className="text-left">
                            <TextSnippetIcon/>
                        </span>
                        <span className="mx-4 text-sm font-normal">
                            Conteúdo
                        </span>
                    </button>
                    <button onClick={() => setTerminal('members')} className={terminal == 'members' ? selected : not_selected}>
                        <span className="text-left">
                            <GroupIcon/>
                        </span>
                        <span className="mx-4 text-sm font-normal">
                            Membros
                        </span>
                    </button>
                    {permission < 2 ? 
                    <button onClick={() => 
                    api.leave(note_id).then(() => window.location.href = '/notes')} className={not_selected + ' text-red-400'}>
                    <span className="text-left">
                        <LogoutIcon/>
                    </span>
                    <span className="mx-4 text-sm font-normal">
                        Desconectar
                    </span>
                </button>
                    : false}
                    {permission > 1 ? <><button onClick={() => setTerminal('settings')} className={terminal == 'settings' ? selected : not_selected}>
                        <span className="text-left">
                            <SettingsIcon/>
                        </span>
                        <span className="mx-4 text-sm font-normal">
                            Configurações
                        </span>
                    </button>
                    </> : false}
                </div>
            </nav>
        </div>
    </div>
    )
}

export default Sidebar;