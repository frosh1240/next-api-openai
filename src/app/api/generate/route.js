import {NextResponse} from 'next/server'
import {Configuration, OpenAIApi} from 'openai'

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

if(!configuration.apiKey) throw new Error('OPEN API KEY is not defined')

const openai = new OpenAIApi(configuration)

export async function POST(request){
    const body = await request.json() 
    
    if(!body.prompt || body.prompt.length === 0){
        return NextResponse.error(new Error("Prompt is requered"),{
            status:400
        })
    }

    try{
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Dame un chiste para programador enfocado en el tema ${body.prompt}`,
            temperature: 0.8,
            max_tokens: 60,
        })
        
        return  NextResponse.json(response.data,choises[0].text)

    } catch (error){
        return NextResponse.error(error, {
            status:400,
        })
    }

    

}