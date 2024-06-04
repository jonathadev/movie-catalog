import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';

describe('MoviesService', () => {
  let service: MoviesService;
  let repository: Repository<Movie>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: getRepositoryToken(Movie),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    repository = module.get<Repository<Movie>>(getRepositoryToken(Movie));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a movie', async () => {
    const movie: CreateMovieDto = {
      title: 'Test Movie',
      director: 'Test Director',
      year: 2024,
      description: 'Test Description',
      releaseDate: new Date('2024-01-01'),
    };

    const createdMovie = {
      id: 1,
      ...movie,
    };

    jest.spyOn(repository, 'create').mockReturnValue(createdMovie as any);
    jest.spyOn(repository, 'save').mockResolvedValue(createdMovie as any);

    expect(await service.create(movie)).toEqual(createdMovie);
  });
});
