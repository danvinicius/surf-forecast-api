import './util/module-alias';
import { Server } from '@overnightjs/core';
import express, { Application } from 'express';
import { ForecastController } from './controllers/forecast';
import * as database from './database';
import { BeachController } from './controllers/beach';

export class SetupServer extends Server {
  constructor(private port = 3000) {
    super();
  }

  public async init(): Promise<void> {
    this.setupExpress();
    this.setupControllers();
    await this.databaseSetup();
  }

  private setupExpress(): void {
    this.app.use(express.json());
  }

  private setupControllers(): void {
    const forecastController = new ForecastController();
    const beachController = new BeachController();
    this.addControllers([forecastController, beachController]);
  }

  private async databaseSetup(): Promise<void> {
    await database.connect();
  }

  public start() {
    this.app.listen(this.port, () => {
      console.info(`Server listening on port ${this.port}`);
    });
  }

  public async close(): Promise<void> {
    await database.close();
  }

  public getApp(): Application {
    return this.app;
  }
}
