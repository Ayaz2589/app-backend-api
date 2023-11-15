import { Streaming, Login } from "../types";

const mobileDevices = [
  "iPhone 15",
  "iPhone 15 Pro",
  "iPhone 15 Pro Max",
  "Samsung Galaxy S15",
  "Samsung Galaxy S15 Ultra",
];

const streamingDevices = [
  "Apple TV",
  "Google Chromecast",
  "Amazon Fire TV",
  "Roku",
  "Xbox",
  "Playstation",
  "Nintendo Switch",
  "Smart TV",
];

const streamingQualities = ["4K", "1080p", "720p"];

const streamingPlans = ["Basic", "Standard", "Premium"];

const streamingLanguages = ["English", "Spanish", "French", "German"];

const getRandomDateWithinLast5Years = (): Date => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const minYear = currentYear - 5;
  const randomYear = Math.floor(Math.random() * 5) + minYear;

  const randomMonth = Math.floor(Math.random() * 12) + 1;
  const randomDay = Math.floor(Math.random() * 28) + 1;

  const randomDate = new Date(randomYear, randomMonth - 1, randomDay);

  return randomDate;
};

const generateLoginDates = (): Login[] => {
  const loginDates: Login[] = [];
  const currentDate = new Date();

  for (let i = 0; i < 90; i++) {
    const newDate = new Date(currentDate);
    const randomHours = Math.floor(Math.random() * 24);
    const randomMinutes = Math.floor(Math.random() * 60);
    const randomSeconds = Math.floor(Math.random() * 60);

    newDate.setHours(currentDate.getHours() - i * 24);
    newDate.setHours(randomHours);
    newDate.setMinutes(randomMinutes);
    newDate.setSeconds(randomSeconds);

    const returnObject: Login = {
      date: newDate,
      watch_time_in_minutes: randomNumberInMidRange(),
    };
    loginDates.push(returnObject);
  }

  return loginDates;
};

function randomNumberInMidRange(min: number = 1, max: number = 120): number {
  const middle = (min + max) / 2;

  const range = (max - min) / 2;
  const randomOffset = Math.random() * range - range / 2;

  return middle + randomOffset;
}

const randomNumber = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const randomBool = () => (Math.random() > 0.5 ? true : false);

const createStreamingInformtion = (): Streaming => {
  const memberSince = getRandomDateWithinLast5Years();
  const isActive = randomBool();

  const formattedStreamingObject: Streaming = {
    member_since: memberSince,
    login_history: generateLoginDates(),
    streaming_plan: streamingPlans[randomNumber(0, 2)],
    is_active: isActive,
    streaming_quality: streamingQualities[randomNumber(0, 2)],
    streaming_device: [
      mobileDevices[randomNumber(0, 4)],
      streamingDevices[randomNumber(0, 7)],
    ],
    streaming_language: streamingLanguages[randomNumber(0, 3)],
    streaming_watch_history: null,
  };

  return formattedStreamingObject;
};

export default createStreamingInformtion;
