import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';

import { NavList } from './nav-list';
import { NavUl, NavLi } from '../styles';
import { navSectionClasses } from '../classes';
import { navSectionCssVars } from '../css-vars';

// ----------------------------------------------------------------------

export function NavSectionMini({
  sx,
  data,
  render,
  slotProps,
  enabledRootRedirect,
  cssVars: overridesVars,
}) {
  const theme = useTheme();

  const cssVars = {
    ...navSectionCssVars.mini(theme),
    ...overridesVars,
  };

  return (
    <Stack component="nav" className={navSectionClasses.mini.root} sx={{ ...cssVars, ...sx }}>
      <NavUl sx={{ flex: '1 1 auto', gap: 'var(--nav-item-gap)' }}>
        {data?.map((group, index) => (
          <Group
            key={index}
            render={render}
            cssVars={cssVars}
            items={group.items}
            slotProps={slotProps}
            enabledRootRedirect={enabledRootRedirect}
          />
        ))}
      </NavUl>
    </Stack>
  );
}

// ----------------------------------------------------------------------

function Group({ items, render, slotProps, enabledRootRedirect, cssVars }) {
  return (
    <NavLi>
      <NavUl sx={{ gap: 'var(--nav-item-gap)' }}>
        {items

          ?.filter((e) => e?.visible)
          .map((list) => (
            <NavList
              key={list.title}
              data={list}
              render={render}
              depth={1}
              slotProps={slotProps}
              enabledRootRedirect={enabledRootRedirect}
            />
          ))}
        {items
          ?.filter((e) => e?.children?.length > 0 && e?.children?.some((child) => child.access))
          .map((list) => (
            <NavList
              key={list.title}
              data={list}
              render={render}
              depth={1}
              slotProps={slotProps}
              enabledRootRedirect={enabledRootRedirect}
            />
          ))}
      </NavUl>
    </NavLi>
  );
}
