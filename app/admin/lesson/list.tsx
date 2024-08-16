import {Datagrid,List,NumberField,ReferenceField,TextField} from 'react-admin';

export const LessonList=()=>{
   return (
      <List>
      <Datagrid rowClick='edit'>
         <TextField source='id'/>
         <TextField source='title'/>
         <ReferenceField source='unitId' reference='units'>
            <TextField source='title'/>
         </ReferenceField>
         <ReferenceField label="Course" source='unitId' reference='units'>
            <ReferenceField source='courseId' reference='courses'/>
         </ReferenceField>
         <NumberField source='order'/>
      </Datagrid>
   </List>
   )
}