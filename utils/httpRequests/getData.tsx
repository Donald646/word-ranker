export const getData = async (endpoint: string): Promise<any> => {
    const response = await fetch(`/${endpoint}`, {
      method: "GET",
    });
    const data = await response.json();
  
    return data;
  };
  