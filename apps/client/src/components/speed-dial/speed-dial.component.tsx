import { Backdrop, SpeedDial, SpeedDialAction, Tooltip } from '@mui/material';
import { FC } from 'react';
import { FaPlus } from 'react-icons/fa';
import {
  MdAssignmentInd,
  MdLockReset,
  MdOutlineAssignmentInd,
} from 'react-icons/md';

interface Props {
  handleCloseSpeedDial: () => void;
  handleOpenSpeedDial: () => void;
  onPushToResetPassword: () => void;
  onPushToSignIn: () => void;
  onPushToSignUp: () => void;
  open: boolean;
}

export const SpeedDialComponent: FC<Props> = ({
  handleCloseSpeedDial,
  handleOpenSpeedDial,
  onPushToResetPassword,
  onPushToSignIn,
  onPushToSignUp,
  open,
}) => {
  const actions = [
    {
      icon: <MdLockReset />,
      name: 'Reset password',
      onClick: onPushToResetPassword,
    },
    { icon: <MdAssignmentInd />, name: 'Sign in', onCLick: onPushToSignIn },
    {
      icon: <MdOutlineAssignmentInd />,
      name: 'Sign up',
      onClick: onPushToSignUp,
    },
  ];

  return (
    <>
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip"
        icon={<FaPlus />}
        onClose={handleCloseSpeedDial}
        onOpen={handleOpenSpeedDial}
        open={open}
        sx={{ bottom: 16, fontSize: '8px', position: 'absolute', right: 16 }}
      >
        {actions.map((action) => (
          <SpeedDialAction
            icon={action.icon}
            key={action.name}
            onClick={action.onClick}
            sx={{ fontSize: '8px', lineHeight: '0' }}
            tooltipOpen
            tooltipTitle={
              <Tooltip arrow sx={{ background: '#00FF00' }} title={action.name}>
                <span
                  style={{
                    background: 'transparent',
                    textWrap: 'nowrap',
                    width: '100px',
                  }}
                >
                  {action.name}
                </span>
              </Tooltip>
            }
          />
        ))}
      </SpeedDial>
    </>
  );
};
