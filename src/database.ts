import config, { IConfig } from 'config';
import mongoose, { ConnectOptions, Mongoose } from 'mongoose';

const dbConfig: IConfig = config.get('App.database');

export const connect = async (): Promise<Mongoose> =>
  await mongoose.connect(dbConfig.get('mongoUrl'), {
    useNewUrlParser: true,
    useUnifiedTopology: true
  } as ConnectOptions);

export const close = (): Promise<void> => mongoose.connection.close()