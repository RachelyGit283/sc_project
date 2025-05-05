import React from 'react';
import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import  { Suspense } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar'; 
const LazyLogin = React.lazy(()=>import('.//login'))
const LazyRegister = React.lazy(()=>import('.//register'))
const LazyAllCars = React.lazy(()=>import('.//AllCars'))
const LazyPositionedObjects = React.lazy(()=>import('.//PositionedObjects'))
const LazyParking = React.lazy(()=>import('.//Parking'))

const Menu = () => {
    const navigate = useNavigate();

    const items = [
        {  
            label: 'login',
            icon: 'pi pi-check',
            command: () => {
                navigate('/login')
            }
        },
        {
            label: 'AllCars',
            icon: 'pi pi-user',
            command: () => {
                navigate('/AllCars')
          
            }
        },
        {
            label: 'PositionedObjects',
            icon: 'pi pi-file-edit',
            command: () => {
                navigate('/PositionedObjects')
          
            }
        },
     
    ];

    const start = <img alt="logo" onClick={()=>{navigate('/')}} src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img>;

    return (
        <div className="card">
            <Menubar model={items} start={start}/>
       <Routes>
       <Route path='/' element={<Suspense fallback="loading..."><LazyLogin /></Suspense> } />
        <Route path='/login' element={<Suspense fallback="loading..."><LazyLogin /></Suspense> } />
        <Route path='/AllCars' element={<Suspense fallback="loading..."><LazyAllCars /></Suspense> } />
        <Route path='/Register' element={<Suspense fallback="loading..."><LazyRegister /></Suspense> } />
        <Route path='/Parking' element={<Suspense fallback="loading..."><LazyParking /></Suspense> } />
        <Route path='/PositionedObjects' element={<Suspense fallback="loading..."><LazyPositionedObjects /></Suspense> } />

      </Routes>
        </div>

    )
}
export default Menu