export default function initMiddleware(middleware: (arg0: any, arg1: any) => any) {
    return async (req: any, res: any) => {
      await middleware(req, res);
    };
  }
  