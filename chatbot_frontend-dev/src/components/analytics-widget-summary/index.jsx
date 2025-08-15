import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';

import { fNumber, fPercent, fShortenNumber } from 'src/utils/format-number';

import { CONFIG } from 'src/config-global';
import { varAlpha, bgGradient } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';
import { Chart, useChart } from 'src/components/chart';
import { Button } from '@mui/material';

// ----------------------------------------------------------------------

export function AnalyticsWidgetSummary({
  icon,
  title,
  buttonTitle,
  chart,
  percent,
  color = 'primary',
  sx,
  OnClickEvent,
  backgroundColor,
  styleColor,
  ...other
}) {
  const theme = useTheme();

  const chartColors = [theme.palette[color].dark];

  const chartOptions = useChart({
    chart: { sparkline: { enabled: true } },
    colors: chartColors,
    xaxis: { categories: chart?.categories },
    grid: {
      padding: {
        top: 6,
        left: 6,
        right: 6,
        bottom: 6,
      },
    },
    tooltip: {
      y: { formatter: (value) => fNumber(value), title: { formatter: () => '' } },
    },
    ...chart?.options,
  });

  const renderTrending = (
    <Box
      sx={{
        top: 16,
        gap: 0.5,
        right: 16,
        display: 'flex',
        position: 'absolute',
        alignItems: 'center',
      }}
    >
      <Iconify width={20} icon={percent < 0 ? 'eva:trending-down-fill' : 'eva:trending-up-fill'} />
      <Box component="span" sx={{ typography: 'subtitle2' }}>
        {percent > 0 && '+'}
        {fPercent(percent)}
      </Box>
    </Box>
  );

  return (
    <Card
      onClick={OnClickEvent}
      sx={{
        ...bgGradient({
          color: `135deg, ${backgroundColor}`,
        }),
        p: 3,
        boxShadow: 'none',
        position: 'relative',
        color: styleColor,
        backgroundColor: 'common.white',
        height: '160px',
        cursor: 'pointer',
        ...sx,
      }}
      {...other}
    >
      <Box sx={{ width: 48, height: 5, mb: 3 }}>{icon}</Box>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
        }}
      >
        <Box sx={{ flexGrow: 1, minWidth: 112 }}>
          <Box sx={{ mb: 1, typography: 'subtitle2', typography: 'h5' }}>{title}</Box>
          <Button>{buttonTitle}</Button>
        </Box>

        <Chart
          type="line"
          series={[{ data: chart?.series }]}
          options={chartOptions}
          width={84}
          height={40}
        />
      </Box>

      <SvgColor
        src={`${CONFIG.assetsDir}/assets/background/shape-square.svg`}
        sx={{
          top: 0,
          left: -20,
          width: 240,
          zIndex: -1,
          height: 240,
          opacity: 0.24,
          position: 'absolute',
          color: styleColor,
        }}
      />
    </Card>
  );
}
