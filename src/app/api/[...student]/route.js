import { NextResponse } from "next/server";
import { NextApiResponse } from 'next';
 
export async function GET (request, content){
    const studentdetails = content.params.student
    console.log("All params", studentdetails);
    let result = JSON.stringify({
        status: 200,
        result: studentdetails
    });
    return new NextResponse(result)
            // OR
    // return new NextResponse(JSON.stringify({status: 200,result: studentdetails}));

    // return  NextResponse.json({
    //     status: 200,
    //     result: studentdetails
    // })
}