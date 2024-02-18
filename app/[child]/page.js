import HomeLayout from "@/components/mainPage/layout/homeLayout";

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
    <div style={{position:"absolute",top:0,lett:0}}>
      <HomeLayout/>
    </div>
  );
}
