import axios from "axios";

const GeneralLaws = [{"renderName":"北市公會-作業通則01.pdf","serverRoute":"/staticFiles/GeneralLaw/北市公會-作業通則01.pdf"},{"renderName":"北市公會-作業通則02.pdf","serverRoute":"/staticFiles/GeneralLaw/北市公會-作業通則02.pdf"},{"renderName":"北市公會-作業通則03.pdf","serverRoute":"/staticFiles/GeneralLaw/北市公會-作業通則03.pdf"},{"renderName":"北市公會-作業通則04.pdf","serverRoute":"/staticFiles/GeneralLaw/北市公會-作業通則04.pdf"},{"renderName":"北市公會-作業通則05.pdf","serverRoute":"/staticFiles/GeneralLaw/北市公會-作業通則05.pdf"},{"renderName":"北市公會-作業通則06.pdf","serverRoute":"/staticFiles/GeneralLaw/北市公會-作業通則06.pdf"},{"renderName":"北市公會-作業通則07.pdf","serverRoute":"/staticFiles/GeneralLaw/北市公會-作業通則07.pdf"},{"renderName":"北市公會-作業通則08.pdf","serverRoute":"/staticFiles/GeneralLaw/北市公會-作業通則08.pdf"},{"renderName":"北市公會-作業通則09.pdf","serverRoute":"/staticFiles/GeneralLaw/北市公會-作業通則09.pdf"},{"renderName":"北市公會-作業通則10.pdf","serverRoute":"/staticFiles/GeneralLaw/北市公會-作業通則10.pdf"}]
const Bulletins = [{"renderName":"全聯會-公報01.pdf","serverRoute":"/staticFiles/Bulletin/全聯會-公報01.pdf"},{"renderName":"全聯會-公報02.pdf","serverRoute":"/staticFiles/Bulletin/全聯會-公報02.pdf"},{"renderName":"全聯會-公報04.pdf","serverRoute":"/staticFiles/Bulletin/全聯會-公報04.pdf"},{"renderName":"全聯會-公報05.pdf","serverRoute":"/staticFiles/Bulletin/全聯會-公報05.pdf"},{"renderName":"全聯會-公報06.pdf","serverRoute":"/staticFiles/Bulletin/全聯會-公報06.pdf"},{"renderName":"全聯會-公報07.pdf","serverRoute":"/staticFiles/Bulletin/全聯會-公報07.pdf"},{"renderName":"全聯會-公報08.pdf","serverRoute":"/staticFiles/Bulletin/全聯會-公報08.pdf"}]
// const cors = 'https://cors-anywhere.herokuapp.com/';
/**
 * 
 * @param {String} payload.item GeneralLaw | Bulletin
 * 
 */
export const getLawFiles = async ( payload ) =>
{
    let url = process.env.BASE_API_URL+'StaticFile/getFiles'
    let defaultPayload = {
        item: 'GeneralLaw'
    }
    let params = {...defaultPayload, ...payload}
    try
    {
        let resp = await axios.get(url, {params})
        return resp.data
    }
    catch(err)
    {
        console.warn(err.message)
        if(params.item === 'GeneralLaw') return GeneralLaws
        else return Bulletins
        return Promise.reject(err)
    }
}