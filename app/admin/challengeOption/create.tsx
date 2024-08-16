import {SimpleForm,Create,TextInput, required, ReferenceInput, BooleanInput, TextField} from 'react-admin';

export const ChallengeOptionCreate=()=>{
   return (
      <Create>
      <SimpleForm>
         <TextInput source='text' validate={[required()]} label='Question'/>
         <BooleanInput source='correct' label='Correct Option'/>
         <ReferenceInput source='challengeId' reference='challenges'/>
         <TextField source='imageSrc' label='Image URL'/>
         <TextField source='audioSrc' label='Audio URL'/>
      </SimpleForm>
   </Create>
   )
}