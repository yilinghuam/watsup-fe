import React from 'react'
import { Layout} from 'antd';
import { Navbar } from '.';
const {Sider, Content, Footer } = Layout;

export const NavLayout = (props:{children:React.ReactNode, background:string}) => {
    let background = props.background

    return(
        <>
            <Layout>
            <Sider style={{backgroundColor:'white'}}>
                <Navbar/>
            </Sider>
                <Layout>
                    <Content style={{display:'flex',flexDirection:'column',justifyContent:"space-around", alignItems:"stretch", backgroundImage:`url(${background})`, backgroundSize:'cover'}}>
                            {props.children}
                            <Footer style={{ textAlign: 'center',background:'none',color:'white',padding:'1%' }}>Watsup ©2021 Created by Wat Holdings</Footer> 
                    </Content>       
                </Layout>
            </Layout>
        </>
    )
}