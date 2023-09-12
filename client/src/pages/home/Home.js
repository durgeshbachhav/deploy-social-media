
import { useDispatch } from 'react-redux';
import Navbar from '../../components/navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { getMyInfo } from '../../redux/slices/appConfigSlice';


const Home = () => {

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getMyInfo())
  },[dispatch])


  return (
    <>
      <Navbar />
      <div className="outlet" style={{ marginTop: '60px' }}>
        <Outlet />
      </div>
    </>

  );
}

export default Home;
