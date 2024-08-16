import {Datagrid,List,NumberField,ReferenceField,SelectField,TextField} from 'react-admin';

export const ChallengeList=()=>{
   return (
      <List>
      <Datagrid rowClick='edit'>
         <TextField source='id'/>
         <TextField source='question'/>
         <SelectField 
            source='type'
            choices={[
               {id:'SELECT', name:'SELECT'},
               {id:'ASSIST', name:'ASSIST'}, 
            ]}
         />
         <ReferenceField source='lessonId' reference='lessons'/>
         <ReferenceField label='Unit' source='lessonId' reference='lessons'>
            <ReferenceField source='unitId' reference='units'/>
         </ReferenceField>
         <ReferenceField label="Course" source='lessonId' reference='lessons'>
            <ReferenceField source='unitId' reference='units'>
               <ReferenceField source='courseId' reference='courses'/>
            </ReferenceField>
         </ReferenceField>
         <NumberField source='order'/>
      </Datagrid>
   </List>
   )
}