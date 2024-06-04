// src/movies/movies.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const movie = this.movieRepository.create(createMovieDto);
    return await this.movieRepository.save(movie);
  }

  async findAll(): Promise<Movie[]> {
    return await this.movieRepository.find();
  }

  async findOne(id: number): Promise<Movie> {
    const movie = await this.movieRepository.findOne({ where: { id } });
    if (!movie) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }
    return movie;
  }

  async update(id: number, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    await this.movieRepository.update(id, updateMovieDto);
    const updatedMovie = await this.movieRepository.findOne({ where: { id } });
    if (!updatedMovie) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }
    return updatedMovie;
  }

  async remove(id: number): Promise<void> {
    const result = await this.movieRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }
  }
}
