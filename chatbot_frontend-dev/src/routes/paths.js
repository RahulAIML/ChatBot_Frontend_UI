const ROOTS = {
  CANDIDATEDASHBOARD: `${import.meta.env.VITE_SUBFOLDER_NAME}/candidate`,
  CANDIDATEAUTH: `${import.meta.env.VITE_SUBFOLDER_NAME}/adminlogin`,
  FCDASHBOARD: `${import.meta.env.VITE_SUBFOLDER_NAME}/fc`,
  FCAUTH: `${import.meta.env.VITE_SUBFOLDER_NAME}/fc/auth`,
  ADMINDASHBOARD: `${import.meta.env.VITE_SUBFOLDER_NAME}/admin`,
  INSTITUTEAUTH: `${import.meta.env.VITE_SUBFOLDER_NAME}/institute/auth`,

  FCDASHBOARD: `${import.meta.env.VITE_SUBFOLDER_NAME}/fc`,
};

export const paths = {
  home: `${import.meta.env.VITE_SUBFOLDER_NAME}`,
  page404: `${import.meta.env.VITE_SUBFOLDER_NAME}/404`,

  auth: {
    admin: {
      login: `${import.meta.env.VITE_SUBFOLDER_NAME}/adminlogin`,
    },
  },
  admin:{
    root:ROOTS.ADMINDASHBOARD,
    upload:`${ROOTS.ADMINDASHBOARD}/upload`,
  }
};
