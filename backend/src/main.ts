import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({
  origin: true,
  credentials: true,
})

  await app.listen(3000)
}

bootstrap()




// import { NestFactory } from '@nestjs/core'

// import { AppModule } from './app.module'

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule)

//   // app.enableCors()
//   app.enableCors({
//   origin: [
//     'https://postit-job-board.vercel.app/',
//   ],
//   credentials: true,
// });

//   await app.listen(3000)
// }

// bootstrap()