import HomeLayout from "@/components/mainPage/layout/mainLayout/homeLayout";

export function generateStaticParams() {
  return [{ child: 'home' }, { child: 'home!' },
          { child: 'blog' }, { child: 'blog!' },
          { child: 'about'},{ child: 'about!'},
          { child: 'contacts'},{ child: 'contacts!'},
        ]
}

export default function Page({ params }) {
  const { child } = params
  return (
    <HomeLayout/>
  );
}
