import { Logger, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configServe: ConfigService): TypeOrmModuleOptions => {
        const config: TypeOrmModuleOptions = {
          type: 'postgres',
          host: configServe.getOrThrow('DATABASE_HOST'),
          port: Number(configServe.getOrThrow('DATABASE_PORT')),
          username: configServe.getOrThrow('DATABASE_USERNAME'),
          password: configServe.getOrThrow('DATABASE_PASSWORD'),
          database: configServe.getOrThrow('DATABASE_NAME'),
          entities: [],
          synchronize: true,
          autoLoadEntities: true,
          logging: true,
        };

        Logger.log('Conectado ao banco');
        return config;
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
