'use client';

import { FormControl, MenuItem, OutlinedInput, Select } from '@mui/material';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
const names = ['vi', 'en'];
const ITEM_HEIGHT = 30;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 80,
      fontSize: '10px',
    },
  },
};

export default function SwitchLang() {
  const locale = useLocale();
  const router = useRouter();
  const handleLocaleChange = (e) => {
    const {
      target: { value },
    } = e;
    router.push(`/${value}`);
  };
  return (
    <FormControl sx={{ width: 65 }}>
      <Select
        displayEmpty
        value={locale}
        onChange={handleLocaleChange}
        input={<OutlinedInput />}
        MenuProps={MenuProps}
        inputProps={{ 'aria-label': 'Without label' }}
        sx={{
          height: 30,
        }}
      >
        {names.map((name) => (
          <MenuItem key={name} value={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
