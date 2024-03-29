import { Hono } from 'hono';
import {userRouter} from './routes/user'
import {blogRouter} from './routes/blog'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {cors } from 'hono/cors'



const app =new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET :string,
	}
}>();

// Create the main Hono app
app.use('/*',cors())
app.route("/api/v1/user",userRouter);
app.route("/pi/v1/blog",blogRouter);

app.use('/api/v1/blog/*', async(c,next)=> {
	const header = c.req.header('Authorisation');
	if(!jwt){
		c.status(401);
		return c.json({error : " You are not allowed to write a blog "})

	}
	const token = jwt.split('')[1];
	const payload = await verify(token , c.env.JWT_SECRET);
	if(!payload){
	  c.status(401);
	  return c.json({error : "unautorised "});
	}
      c.set('userId',payload.id);
	  await next()
	}
)

app.post('/api/v1/signup', (c) => {
	return c.text('signup route')
})

app.post('/api/v1/signin', async (c) => {
	const prisma = new PrismaClient({
    datasourceUrl: env.DATABASE_URL,
}).$extends(withAccelerate());

const body = await c.req.json();

try {
	const user =await prisma.user.create({
		data : {
			email : body.email,
			password : body.password,
		},
	})
	const jwt = await sign({id : user.id},c.env.JWT_SECRET) ;
	return c.json({jwt});
	
} catch (error) {
c.status(403);
return c.json({error:"error while signing up"});
}

})






app.get('/api/v1/blog/:id', (c) => {
	const id = c.req.param('id')
	console.log(id);
	return c.text('get blog route')
})

app.post('/api/v1/blog', (c) => {

	return c.text('signin route')
})

app.put('/api/v1/blog', (c) => {
	return c.text('signin route')
})

export default app;
