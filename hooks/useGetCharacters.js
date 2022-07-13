import {useQuery, gql} from '@apollo/client'


const GET_CHARACTERS = gql`
    query GetCharacter($gender: String!, $status: String!, $name: String!){
        characters(filter:{gender: $gender, status: $status, name: $name}){
        results{
            name
            status
            gender
            image
            created
        }
    }
    }`

export const useGetCharacters = (gender, status, search) => {
    const {data, error, loading, refetch} = useQuery(GET_CHARACTERS, {
        variables:{
            gender,
            status,
            name: search
        }
    });

    return {
        data,
        error,
        refetch
    }
}
