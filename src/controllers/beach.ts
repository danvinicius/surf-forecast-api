import { Controller, Post } from '@overnightjs/core';
import { Request, Response } from 'express';

@Controller('beaches')
export class BeachController {
  @Post('')
  public async create(req: Request, res: Response): Promise<void> {
    res.status(201).send({ id: 'fake-id', ...req.body });
  }
}
