import { isEmpty, isUndefined } from "lodash"
export class UrlBuilder
{
    constructor( option = {} )
    {
        this.hostFQDN = option.hostFQDN
        this.template = option.template
        this.param = option.param
        this.query = option.query
    }
    get querystring()
    {
      return Object.keys(this.query)
            .map(key => key + '=' + this.query[key])
            .join('&');

    }
    get url () 
    {
        let path = this.template;
        for (const key in this.param) {
          if (Object.hasOwnProperty.call(this.param, key)) {
            const value = this.param[key];
            const regex = new RegExp(`:${key}`);
            path = path.replace(regex, value);
          }
        }
        let result = `${this.hostFQDN}/${path}`
        if( !isEmpty(this.query) || !isUndefined(this.query) )
        {
          result += `?${this.querystring}`
        }
        return result;
    }
}