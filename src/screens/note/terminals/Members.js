const Members = ({api, note}) => 
{
    return (
        <div style={{height: '100vh', paddingBottom: 120, overflowY: 'scroll'}}>
            <div className="flex flex-col items-center justify-center">
                <div className="flex-col items-center justify-center">
                    {note.contributors ? note.contributors.sort((a,b) => {
                        if (a.permission < b.permission) {return 1};
                        if (b.permission < a.permission) {return -1};
                        return 0;
                    }).map((member, index) => <MemberCard first={index == 0} note={note} api={api} member={member} key={member.id}/>) : false}
                </div>
            </div>
        </div>
    )
}

const MemberCard = ({member, api, note, first}) => {
    return(
        
<div className="shadow-lg rounded-2xl bg-white dark:bg-gray-800 p-4" style={!first ? {marginTop: 15} : {}}>
    <div className="flex-row gap-4 flex justify-center items-center">
        <div className="flex-shrink-0">
            <a href="#" className="block relative">
                <img alt="profil" src={api.ENDPOINT + '/userPicture/' + member.id} className="mx-auto object-cover rounded-full h-16 w-16 "/>
            </a>
        </div>
        <div className=" flex flex-col">
            <span className="text-gray-600 dark:text-white text-lg font-medium">
                {member.name}
            </span>
            <span className="text-gray-400 text-xs">
                {member.permission == 2 ? 'Administrador' : member.permission == '1' ? 'Ver/Editar' : 'Apenas leitura'}
            </span>
        </div>
        {note.permission < 2 ? false : <button onClick={() => {api.removeUser(note.id, member.id)}} type="button" className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
            {member.id == api.user.id ? 'Você' : 'Remover'}
        </button>}
        {/* {note} */}
    </div>
</div>

    )
}

export default Members;