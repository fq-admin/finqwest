import {SimpleForm,Edit,TextInput, required, ReferenceInput, BooleanInput, TextField} from 'react-admin';

export const ChallengeOptionEdit=()=>{
   return (
      <Edit>
      <SimpleForm>
         <TextInput source='text' validate={[required()]} label='Question'/>
         <BooleanInput source='correct' label='Correct Option'/>
         <ReferenceInput source='challengeId' reference='challenges'/>
         <TextField source='imageSrc' label='Image URL'/>
         <TextField source='audioSrc' label='Audio URL'/>
      </SimpleForm>
   </Edit>
   )
}