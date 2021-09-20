import UUID from "../utilities/UUID"
class Processor
{
    constructor( exe_function )
    {
        this._id = UUID()
        this.exe_function = exe_function
    }
    exe( param )
    {
        return this.exe_function( param )
    }
}

export default Processor