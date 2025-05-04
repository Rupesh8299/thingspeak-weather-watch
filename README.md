
# ThingSpeak Weather Monitoring Dashboard

A real-time weather monitoring dashboard that displays data from ThingSpeak IoT sensors.

## Project Overview

This React application fetches and displays live environmental data from ThingSpeak IoT sensors, including:

- Temperature (BMP180)
- Humidity
- Pressure
- Air Quality
- Light Intensity

The dashboard auto-refreshes every 15 seconds and includes historical charts for temperature and air quality.

![Dashboard Preview](./screenshot.png)

## Features

- **Real-time Data**: Auto-refreshes every 15 seconds
- **Mobile Responsive**: Optimized for all device sizes
- **Interactive UI**: Color-coded indicators and progress bars
- **Historical Data**: Charts showing the last 10 readings
- **Error Handling**: Proper error states and loading indicators
- **Manual Refresh**: Button to manually update data

## Technical Implementation

### API Integration

The application connects to ThingSpeak's API:
- **Channel ID**: 2946903
- **API Key**: CD8JV5VYAVX4L9EG
- **Endpoint**: https://api.thingspeak.com/channels/2946903/feeds.json

### Technologies Used

- **React**: Functional components with hooks
- **TypeScript**: Type safety throughout the codebase
- **Vite**: Fast development environment and builds
- **Tailwind CSS**: Utility-first styling
- **shadcn/ui**: Pre-built accessible UI components
- **Recharts**: Responsive charts for data visualization
- **Lucide React**: Icon library

### Core Components

1. **WeatherDashboard**: Main container component that fetches and manages data
2. **MeasurementCard**: Displays individual sensor readings with visual indicators
3. **DataChart**: Visualizes historical data for selected metrics
4. **useThingspeak**: Custom hook for API integration and data management

### Project Structure

```
src/
├── components/
│   ├── DataChart.tsx
│   ├── MeasurementCard.tsx
│   ├── WeatherDashboard.tsx
│   └── ui/ (shadcn components)
├── hooks/
│   ├── use-mobile.tsx
│   └── useThingspeak.ts
├── lib/
│   └── utils.ts
├── pages/
│   ├── Index.tsx
│   └── NotFound.tsx
├── types/
│   └── thingspeak.ts
├── utils/
│   └── formatters.ts
└── App.tsx
```

## Data Fields

| Field   | Description      | Unit     |
|---------|------------------|----------|
| field1  | Temperature      | °C       |
| field2  | Humidity         | %        |
| field3  | Pressure         | hPa      |
| field4  | Air Quality      | AQI      |
| field5  | Light Intensity  | Lux      |

## How to Extend

### Adding New Sensors

To add a new sensor:

1. Update the `ThingspeakFeed` interface in `src/types/thingspeak.ts`
2. Add a formatter in `src/utils/formatters.ts`
3. Add a new card in `src/components/WeatherDashboard.tsx`
4. Create a new chart if needed

### Customizing the UI

- Colors and gradients are defined in the component files
- Progress bar thresholds can be adjusted in `WeatherDashboard.tsx`
- Chart options are configurable in `DataChart.tsx`

## Deployment

The application is deployed and accessible at [your-deployment-url]. It can be deployed to any static hosting service.

## Performance Considerations

- API data is cached to minimize requests
- Components use memoization where appropriate
- Mobile-specific optimizations like simplified charts on small screens

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
