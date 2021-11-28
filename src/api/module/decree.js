// import decrees from '../../assets/staticFile/decrees.json'

export const listAll = async () => {
    return (await import('../../assets/staticFile/decrees.json'))
}
