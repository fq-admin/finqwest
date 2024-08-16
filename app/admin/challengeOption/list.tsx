import { BooleanField, Datagrid, List, NumberField, Pagination, ReferenceField, ReferenceInput, SearchInput, SelectInput, TextField, TextInput } from 'react-admin';

const postFilters = [
    <ReferenceInput key={1} label="Challenge" source="challengeId" reference="challenges">
        <SelectInput optionText="question" />
    </ReferenceInput>,
];


export const ChallengeOptionList = () => {
    return (
        <List
            filters={postFilters}
            pagination={<Pagination />}
        >
            <Datagrid rowClick="edit">
                <NumberField source="id" />
                <TextField source="text" />
                <BooleanField source="correct" />
                <ReferenceField source="challengeId" reference="challenges" />
                <ReferenceField label="Lesson" source="challengeId" reference="challenges">
                    <ReferenceField source="lessonId" reference="lessons" />
                </ReferenceField>
                <ReferenceField label="Unit" source="challengeId" reference="challenges">
                    <ReferenceField source="lessonId" reference="lessons">
                        <ReferenceField source="unitId" reference="units" />
                    </ReferenceField>
                </ReferenceField>
                <ReferenceField label="Course" source="challengeId" reference="challenges">
                    <ReferenceField source="lessonId" reference="lessons">
                        <ReferenceField source="unitId" reference="units">
                            <ReferenceField source="courseId" reference="courses" />
                        </ReferenceField>
                    </ReferenceField>
                </ReferenceField>
                <TextField source="imageSrc" />
                <TextField source="audioSrc" />
            </Datagrid>
            <Pagination />
        </List>
    );
}
