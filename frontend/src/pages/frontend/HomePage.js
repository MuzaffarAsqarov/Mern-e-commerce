import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ListCategory from '../../components/ListCategory';
import Banner from '../../components/banner/Banner';
import PopularProducts from '../../components/PopularProducts';

const HomePage = () => {

  return (
    <div className='container mx-auto p-4'>
       <ListCategory/>
       <Banner/>

       <PopularProducts categoryId={'66f0e86fc5de238709f69677'} header={"Top's Mobiles"} type={'horizontal'}/>
       <PopularProducts categoryId={'66f0ea40f2ace6f8a2b6f403'} header={"Popular's Mouses" } type={'horizontal'}/>

       <PopularProducts categoryId={'66f0e744cac5a44df50c845e'} header={"Popular's TVs"} type={'vertical'}/>
       <PopularProducts categoryId={'66f0e80d4c82e53bcd9c15fb'} header={"Popular's Camera"} type={'vertical'}/>
       <PopularProducts categoryId={'66f104f2f1536f5d793a7cdb'} header={"Popular's Printers"} type={'vertical'}/>
       <PopularProducts categoryId={'66f0e7aa4c82e53bcd9c15f7'} header={"Popular's Watches"} type={'vertical'}/>
       <PopularProducts categoryId={'66f1055ef1536f5d793a7ce4'} header={"Popular's Speakers"} type={'vertical'}/>
       <PopularProducts categoryId={'66f1052bf1536f5d793a7cde'} header={"Popular's Protsessors"} type={'vertical'}/>
       <PopularProducts categoryId={'66f0e7dd4c82e53bcd9c15f9'} header={"Popular's Airpods"} type={'vertical'}/>

       
       
    </div>
  )
}

export default HomePage