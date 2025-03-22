import { connect } from 'mongoose'
import { config } from '../config/index'

export const initMongoAtlas = async () => {
    try{
        await connect(config.db.connectionString)
        console.log('Connected to MongoDB:',config.db.connectionString )
    } catch (error) {
        console.log('Error connecting to MongoDB Atlas: ', error)
    }
}