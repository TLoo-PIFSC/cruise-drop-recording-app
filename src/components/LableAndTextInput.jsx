import { Label, TextInput } from "@trussworks/react-uswds";

export default function LableAndTextInput({ title, record }) {
    function transformTitleToId(_title) {
        return _title.replace(/\s/g, '');
    }

    return <>
        <Label htmlFor={transformTitleToId(title)} className='margin-bottom-0'>{title}</Label>
        <TextInput
            id={transformTitleToId(title)}
            name={transformTitleToId(title)}
            type="text"
            className='margin-top-0 margin-bottom-3'
            value={record}
            readOnly
        />
    </>
}