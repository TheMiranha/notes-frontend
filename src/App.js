import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios';
import Cookie from 'universal-cookie'

import Home from './screens/home/Home'
import Auth from './screens/auth/Auth';
import Notes from './screens/notes/Notes'
import Note from './screens/note/Note'
import Share_Code from './screens/share_code/Share_Code';
import NotFound from './screens/notFound/NotFound'
import Profile from './screens/profile/Profile';

const ENDPOINT = 'https://miranha-notes-backend.herokuapp.com'
const cookie = new Cookie();

const App = () => {

  const [user, setUser] = useState(false);

  useEffect(() => {
    const init = async() => {
      var logged = await checkToken();
      if (logged) {
        await getUserByToken();
      }
    }
    init();
    var interval = setInterval(() => {
      getUserByToken();
    },5000)
    return () => clearInterval(interval);
  }, [])

  const login = async(email, password) => {
    const res = await axios.post(`${ENDPOINT}/login`,{email, password}).then(x => x.data);
    if (res.response) {
      cookie.set('token', res.response, { path: '/' });
    }
    return res;
  }

  const register = async(email, password, name) => {
    const res = await axios.post(`${ENDPOINT}/register`,{email, password, name}).then(x => x.data);
    if (res.response) {
      cookie.set('token', res.response, { path: '/' });
    }
    return res;
  }

  const checkToken = async() => {
    const token = cookie.get('token');
    if (token) {
      const res = await axios.post(`${ENDPOINT}/checkToken`,{token}).then(x => x.data);
      return res.response ? true : false;
    }
  }

  const getUserByToken = async() => {
    const token = cookie.get('token');
    if (token) {
      const res = await axios.post(`${ENDPOINT}/getUserByToken`,{token}).then(x => x.data);
      setUser(res.response);
      return res.response ? res.response : false;
    }
    return false;
  }

  const logout = (redirect = '/') => {
    cookie.remove('token', { path: '/' });
    setUser(false);
    window.location.href = redirect;
  }

  const createNote = async (formData) => {
    formData.append('token', cookie.get('token'));
    await axios.post(`${ENDPOINT}/createNote`, formData).then(x => x.data);
    var data = await getUserByToken();
    return data;
  }

  const deleteNote = async (note) => {
    await axios.post(`${ENDPOINT}/deleteNote`, {token: cookie.get('token'), note}).then(x => x.data);
    var data = await getUserByToken();
    return data;
  }

  const saveNote = async (content, note_id) => {
    var data = await axios.post(`${ENDPOINT}/saveNote`, {token: cookie.get('token'), content, note_id}).then(x => x.data);
    return data;
  }

  const saveNoteTags = async (tags, note_id) => {
    var data = await axios.post(`${ENDPOINT}/saveNoteTags`, {token: cookie.get('token'), tags, note_id}).then(x => x.data);
    return data;
  }

  const saveNotePriority = async (priority, note_id) => {
    var data = await axios.post(`${ENDPOINT}/saveNotePriority`, {token: cookie.get('token'), priority, note_id}).then(x => x.data);
    return data;
  }

  const saveNoteStatus = async (status, note_id) => {
    var data = await axios.post(`${ENDPOINT}/saveNoteStatus`, {token: cookie.get('token'), status, note_id}).then(x => x.data);
    return data;
  }

  const generateShareCode = async (note_id) => {
    await axios.post(`${ENDPOINT}/generateShareCode`, {token: cookie.get('token'), note_id}).then(x => x.data);
  }

  const getNoteByShareCode = async (share_code) => {
    var data = await axios.post(`${ENDPOINT}/getNoteByShareCode`, {token: cookie.get('token'), share_code}).then(x => x.data);
    return data;
  }

  const saveShareCodeStatus = async (status, note_id) => {
    var data = await axios.post(`${ENDPOINT}/saveShareCodeStatus`, {note_id: note_id, token: cookie.get('token'), status}).then(x => x.data);
    return data;
  }

  const acceptShareCode = async(code) => {
    var data = await axios.post(`${ENDPOINT}/acceptShareCode`, {token: cookie.get('token'), code}).then(x => x.data);
    return data;
  }

  const leave = async (note_id) => {
    await axios.post(`${ENDPOINT}/leave`, {token: cookie.get('token'), note_id}).then(x => x.data);
  }

  const removeUser = async (note_id, user_id) => {
    await axios.post(`${ENDPOINT}/removeUser`, {token: cookie.get('token'), note_id, user_id}).then(x => x.data);
  }

  const saveProfile = async (formData) => {
    formData.append('token', cookie.get('token'));
    var data = await axios.post(`${ENDPOINT}/saveProfile`, formData).then(x => x.data);
    console.log(data);
  }

  const api = {
    login,
    register,
    checkToken,
    saveProfile,
    getUserByToken,
    generateShareCode,
    getNoteByShareCode,
    leave,
    saveShareCodeStatus,
    acceptShareCode,
    createNote,
    removeUser,
    saveNoteTags,
    saveNotePriority,
    deleteNote,
    saveNoteStatus,
    saveNote,
    user,
    logout,
    setUser,
    ENDPOINT,
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home api={api}/>} />
        <Route path="/auth" element={<Auth api={api}/>}/>
        <Route path="/notes" element={<Notes api={api}/>}/>
        <Route path="/note/:note_id" element={<Note api={api}/>}/>
        <Route path="/share_code/:share_code" element={<Share_Code api={api}/>}/>
        <Route path="/profile" element={<Profile api={api}/>}/>
        <Route path='*' element={<NotFound api={api}/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
