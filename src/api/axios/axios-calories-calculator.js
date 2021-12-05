import axios from './axios-flame-coach';

export const getHarrisBenedictCalculator = async (weight, height, gender, age, unit, pal) => {

  const url = `/calculator/harrisBenedict?weight=${weight}&height=${height}&sex=${gender}&age=${age}&unit=${unit}`;
  const urlWithPal = `/calculator/harrisBenedict?weight=${weight}&height=${height}&sex=${gender}&age=${age}&unit=${unit}&pal=${pal}`;

  const config = {
    method: 'get',
    url: pal ? urlWithPal : url,
  };

  const response = await axios(config);

  return response.data;

};

