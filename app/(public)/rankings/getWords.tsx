import { createClient } from "@/utils/supabase/server"


export const getWords = async() => {
    const supabase = createClient()
    const {data, error} = await supabase.from("word_rankings").select("word, bayesian_average").order("bayesian_average", {ascending:false}).limit(10)
    if (error){
        console.log(error.message)
    }else{
        return data
    }
}