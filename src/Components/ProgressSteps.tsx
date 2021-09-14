import React from 'react'
import { Steps, Divider } from 'antd';
const { Step } = Steps;

interface stepsConfig {
    first:string;
    second:string;
    third:string;
}

type stageread = (name: number) => void;


export const ProgressSteps = (props:{steps:stepsConfig, stage:stageread, stageNumber:number}) => {

    return (
      <>
        <Steps current={props.stageNumber} onChange={props.stage}>
          <Step title={props.steps.first} />
          <Step title={props.steps.second}  />
          <Step title={props.steps.third}  />
        </Steps>

        <Divider />
      </>
    );
}