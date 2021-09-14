import React, { useState } from 'react'
import { 
    NavLayout, 
    ProgressSteps, 
    FormDetails,
    FormSetup,
    Review
 } from '../Components'
import { SingleContent } from '../Components'
import {pineappleImg} from '../Assets'
import { Formconfig } from '../Interfaces/Host'

export const Groupbuy = () => {
    type stageread = (name: number) => void;

    const [stageNumber,setStageNumber] = useState(0)
    const [form,setForm] = useState<Formconfig>({details:{},setup:[]})

    let steps = {
        first:'Details',
        second:'Form Set-up',
        third:'Review'
    }

    const onStageChange:stageread = (value:number) => {
        setStageNumber(value)
        console.log(value)
    }
    
    return(
    <NavLayout background={pineappleImg}>
        <SingleContent>
            <ProgressSteps steps={steps}  stage={onStageChange} stageNumber={stageNumber}/>
            {stageNumber === 0? <FormDetails setStage={setStageNumber} formValues={form} setForm={setForm}/>:''}
            {stageNumber === 1? <FormSetup setStage={setStageNumber} formValues={form} setForm={setForm}/>:''}
            {stageNumber === 2? <Review formValues={form}/>:''}
            {console.log(form)}
        </SingleContent>
    </NavLayout>
    )
}