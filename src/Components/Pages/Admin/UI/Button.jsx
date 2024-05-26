import { Button } from "primereact/button";

const DynamicButton = ({label, color, onClick, textColor='white'}) => {
    return (
        <Button label={label} onClick={onClick} style={{backgroundColor : color, color : textColor, margin:"5px", paddingLeft: "15px", paddingRight:"15px", paddingTop: "5px", paddingBottom:"5px"}} size="large" />
    )
}

export default DynamicButton