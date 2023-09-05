import { useState, useEffect } from 'react';
import { ReactComponent as IconChevron } from 'assets/icons/chevron.svg';
import styles from 'components/UI/Pagination/styles.module.sass';

type Props = {
    className?: string,
    value?: number,
    stepsLength?: number,
    updateValue?: (step: number) => void,
}

function Pagination(prevProps: Props): JSX.Element {
    const props = {
        value: 1,
        stepsLength: 5,
        updateValue: () => {},
        ...prevProps,
    };

    const MAX_VIEW_STEPS = 5;

    const [stepList, setStepList] = useState<number[]>([]);

    useEffect(() => {
        const arraySize = props.stepsLength > MAX_VIEW_STEPS ? MAX_VIEW_STEPS : props.stepsLength;
        const initStepList = [...Array(arraySize).keys()].map(index => index + 1);

        setStepList(initStepList);
    }, [props.stepsLength]);

    const setStep = (step: number) => {
        props.updateValue(step);
    
        const lastIndex = stepList.length - 1;
    
        if (step === stepList[lastIndex] && step < (props.stepsLength - 1)) {
            const newStepList = stepList.map(item => item + 1);
            setStepList(newStepList);
        }
    
        if (step === stepList[0] && step > 1) {
            const newStepList = stepList.map(item => item - 1);
            setStepList(newStepList);
        }
    };

    const getStepClasses = (step: number) => {
        return `
            ${styles['step']}
            ${props.value === step && styles['step-active']}
        `;
    };

    const geDisabledClasses = (step: number) => {
        return `
            ${props.value === step && styles['disabled']}
        `;
    };

    return (
        <div className={styles['pagination']}>
            <IconChevron
                className={`${styles['prev']} ${geDisabledClasses(1)}`}
                onClick={() => setStep(props.value - 1)}
            />

            {stepList.map(step =>
                <div
                    className={getStepClasses(step)}
                    key={step}
                    onClick={() => setStep(step)}
                >
                    {step}
                </div>,
            )}

            {props.stepsLength > MAX_VIEW_STEPS &&
                <>
                    <div className={styles['step-ellipsis']}>...</div>

                    <div
                        className={getStepClasses(props.stepsLength)}
                        onClick={() => setStep(props.stepsLength)}
                    >
                        {props.stepsLength}
                    </div>
                </>
            }

            <IconChevron
                className={`${styles['next']} ${geDisabledClasses(props.stepsLength)}`}
                onClick={() => setStep(props.value + 1)}
            />
        </div>
    );
}

export default Pagination;