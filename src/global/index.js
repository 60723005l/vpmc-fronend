// var Global = 
// {
//     viewer: undefined
// }

// export default Global

import { ViewerPromise, createViewer } from "../lib/viewer";

class Global
{
    constructor( option = {} )
    {
        this.viewer = undefined,
        this.viewerPromise = new ViewerPromise()
    }
    createViewer( option )
    {
        return this.viewer = createViewer( option )
    }
}

export default new Global()