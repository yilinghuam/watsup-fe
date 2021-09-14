import React from 'react'
import { Row, Col } from 'antd';


export const SingleContent = (props:{children:React.ReactNode}) => {
    return(
        <Row justify='center' style={{backgroundColor:'rgb(255,255,255,0.8)',flex:'1',margin:'6vh',borderRadius:'10vh'}}>
            <Col span={18} style={{margin:'4%'}}>
            {props.children}
            </Col>
        </Row>
    )
}